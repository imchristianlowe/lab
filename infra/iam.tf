resource "aws_iam_role" "s3_backups" {
  name = "s3-backups"
  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
       {
        "Effect": "Allow",
        "Principal": {
          "AWS": module.iam_user.iam_user_arn
        },
        "Action": "sts:AssumeRole"
      },
      {
        "Effect": "Deny",
        "Principal": {
          "AWS": module.iam_user.iam_user_arn
        },
        "Action": "sts:AssumeRole",
        "Condition": {
          "NotIpAddress": {
            "aws:SourceIp": [
              "71.86.96.205/32",
            ]
          }
        }
      }
    ]
  })
}

resource "aws_iam_policy" "s3_backup" {
  name = "s3-backup"
  policy = data.aws_iam_policy_document.s3_backup_policy.json
}

resource "aws_iam_role_policy_attachment" "s3_backup" {
  role = aws_iam_role.s3_backups.name
  policy_arn = aws_iam_policy.s3_backup.arn
}

data "aws_iam_policy_document" "s3_backup_policy" {
  statement {
    sid = "1"

    actions = [
      "s3:PutObject",
    ]

    resources = [
      aws_s3_bucket.backups.arn,
      "${aws_s3_bucket.backups.arn}/*"
    ]
  }
}

data "aws_iam_policy_document" "user_policy_document" {
  statement {
    sid = "1"

    actions = [
      "sts:AssumeRole",
    ]

    resources = [
      "*",
    ]
  }
}


resource "aws_iam_user_policy" "s3_backup_user_policy" {
  name = "test"
  user = module.iam_user.iam_user_name
  policy = data.aws_iam_policy_document.user_policy_document.json
}

module "iam_user" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-user"

  name          = "s3-backups"
  force_destroy = true

  password_reset_required = false
  create_iam_user_login_profile = false
}
