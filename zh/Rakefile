# filename: Rakefile
task :default do
  puts "Running CI tasks..."
  sh("JEKYLL_ENV=production bundle exec jekyll build --drafts")
  puts "Jekyll successfully built"
end