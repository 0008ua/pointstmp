rd frontend_dist /s /q
if exist frontend_dist rd /s /q frontend_dist
cd points

npm --no-git-tag-version version patch & ionic build --aot --prod