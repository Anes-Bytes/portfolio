import requests

def get_github_data(username):
    try:
        # Get User Info
        user_res = requests.get(f"https://api.github.com/users/{username}")
        user_data = user_res.json() if user_res.status_code == 200 else {}
        
        # Get Repositories
        repos_res = requests.get(f"https://api.github.com/users/{username}/repos?sort=updated&per_page=6")
        repos_data = repos_res.json() if repos_res.status_code == 200 else []
        
        # Get stars count (optional, requires more API calls if not in user_data)
        # For simplicity, we'll use what's available
        
        return {
            "user_stats": {
                "public_repos": user_data.get("public_repos", 0),
                "followers": user_data.get("followers", 0),
                "following": user_data.get("following", 0),
                "stars": sum(repo.get("stargazers_count", 0) for repo in repos_data),
            },
            "recent_repos": [
                {
                    "name": repo.get("name"),
                    "description": repo.get("description"),
                    "url": repo.get("html_url"),
                    "stars": repo.get("stargazers_count"),
                    "forks": repo.get("forks_count"),
                    "language": repo.get("language"),
                    "updated_at": repo.get("updated_at"),
                } for repo in repos_data
            ]
        }
    except Exception as e:
        print(f"Error fetching github data: {e}")
        return {"user_stats": {}, "recent_repos": []}
