output "cloudflare_zero_trust_tunnel_cloudflared_tunnel_name" {
  value = cloudflare_zero_trust_tunnel_cloudflared.this.name
}

output "cloudflare_zero_trust_tunnel_cloudflared_tunnel_token" {
  value = data.cloudflare_zero_trust_tunnel_cloudflared_token.this
}
