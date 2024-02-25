vendor/bin/wp --allow-root core install \
  --url=$WORDPRESS_URL \
  --title="Test Site 01" \
  --admin_user=$WORDPRESS_ADMIN_USER \
  --admin_password=$WORDPRESS_ADMIN_PASSWORD \
  --admin_email="vinyl@wp-blocks.com" \
  --skip-email

vendor/bin/wp --allow-root plugin activate vinyl
