# git-github-eniso-course

🔹 Step 1: Fork the project

Go to the repository on GitHub.

In the top-right corner, click Fork → this creates a copy under your account.

🔹 Step 2: Clone your fork locally
git clone https://github.com/<your-username>/<repo>.git
cd <repo>

🔹 Step 3: Add the original repo as "upstream"

This lets you keep your fork updated:

git remote add upstream https://github.com/<original-owner>/<repo>.git
git remote -v   # check remotes

🔹 Step 4: Create a new branch for your contribution

Never work directly on main or master:

git checkout -b feature/my-new-feature

🔹 Step 5: Make your changes

Edit code, fix bugs, or add new features.

Stage and commit them:

git add .
git commit -m "feat: add X feature"   # use a clear message

🔹 Step 6: Push changes to your fork
git push origin feature/my-new-feature

🔹 Step 7: Open a Pull Request

Go to your fork on GitHub.

GitHub will show: "Compare & pull request" → click it.

Make sure:

Base repo = original project

Head repo = your fork + your feature branch

Write a clear title + description.

Click Create pull request ✅

🔹 Step 8: Keep your fork updated (optional but important)

If the original repo changes while you’re working:

git fetch upstream
git checkout main
git pull upstream main
git push origin main
