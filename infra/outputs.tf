output "cloudflare_zero_trust_tunnel_cloudflared_tunnel_name" {
  value = cloudflare_zero_trust_tunnel_cloudflared.this.name
}

output "cloudflare_zero_trust_tunnel_cloudflared_tunnel_token" {
  value = data.cloudflare_zero_trust_tunnel_cloudflared_token.this
}

output "s3_backup_role_arn" {
  value = aws_iam_role.s3_backups.arn
}

output "s3_backup_access_key_id" {
  value = module.iam_user.iam_access_key_id
}

output "s3_backup_access_key_secret" {
  value = module.iam_user.iam_access_key_secret
  sensitive = true
}
