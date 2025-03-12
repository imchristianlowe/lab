data "cloudflare_account" "this" {
  filter = {
    name = "Clowe Account"
  }
}

data "cloudflare_zone" "this" {
  filter = {
    account = {
      id = data.cloudflare_account.this.account_id
    }
    name = "christianlowe.com"
  }
}

resource "random_password" "tunnel_secret" {
  length = 64
}


resource "cloudflare_zero_trust_tunnel_cloudflared" "this" {
  account_id    = data.cloudflare_account.this.account_id
  name          = "clowe-app"
  config_src    = "local"
  tunnel_secret = base64sha256(random_password.tunnel_secret.result)
}


resource "cloudflare_zero_trust_tunnel_cloudflared_config" "this" {
  account_id = data.cloudflare_account.this.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.this.id
  config = {
    ingress = [
      {
        hostname = "api.christianlowe.com"
        service  = "http://clowe-drf:8000"
      },
      {
        service = "http_status:404"
      },
    ]
  }
}


# TODO: Currently a bug https://github.com/cloudflare/terraform-provider-cloudflare/issues/5149
data "cloudflare_zero_trust_tunnel_cloudflared_token" "this" {
  account_id = data.cloudflare_account.this.account_id
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.this.id
}


# Creates the CNAME record that routes http_app.${var.cloudflare_zone} to the tunnel.
resource "cloudflare_dns_record" "app" {
  zone_id = data.cloudflare_zone.this.zone_id
  name    = "api"
  content = "${cloudflare_zero_trust_tunnel_cloudflared.this.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
  ttl     = 1
}
