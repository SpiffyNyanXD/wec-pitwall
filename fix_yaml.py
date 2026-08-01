import glob
import re

for filepath in glob.glob('.github/workflows/*.yml'):
    with open(filepath, 'r') as f:
        content = f.read()

    # The previous regex left orphan properties like "branches: [ main ]" and "- cron:"
    # Let's cleanly fix it

    # Let's just remove the commented out push, pull_request, schedule completely along with their children
    new_content = []
    in_on = False
    in_push_pull = False
    for line in content.split('\n'):
        if line.startswith('on:'):
            in_on = True
            new_content.append(line)
            continue

        if in_on:
            if line.strip() == '' or line.strip().startswith('#'):
                new_content.append(line)
                continue

            if line.strip() == 'workflow_dispatch:':
                in_on = False
                in_push_pull = False
                new_content.append(line)
                continue

            if not line.startswith(' '):
                in_on = False
                in_push_pull = False
                new_content.append(line)
                continue

            # If it's a branch, cron, or something else indented under on:
            # and it's not workflow_dispatch, we comment it out
            new_content.append('# ' + line)
        else:
            new_content.append(line)

    with open(filepath, 'w') as f:
        f.write('\n'.join(new_content))
