OctoFit Tracker — Project layout and setup

Structure
```
octofit-tracker/
├── backend/
│   ├── venv/            # (created by you via venv command)
│   ├── requirements.txt # Python deps for the backend
└── frontend/            # React or other frontend app
```

Quick backend setup (from workspace root, do NOT change directories in tooling):

1. Create the Python venv:

```bash
python3 -m venv /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend/venv
```

2. Activate the venv and install requirements:

```bash
source /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend/venv/bin/activate
pip install -r /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend/requirements.txt
```

Notes
- Follow the project instructions: use Django ORM for DB interactions.
- The repo's `.github/instructions` contains more detailed setup notes.
- Forwarded ports (when running services): 8000 (public), 3000 (public), 27017 (private).
