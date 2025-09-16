pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh '''
          DEPLOY="$HOME/devops_lab_site"
          mkdir -p "$DEPLOY"
          cp -f 1/Event_registration.html "$DEPLOY"/Event_registration.html || true
        '''
      }
    }

    stage('Serve') {
      steps {
        sh '''
          DEPLOY="$HOME/devops_lab_site"
          FILE="$DEPLOY/Event_registration.html"

          if [ -f "$FILE" ]; then
            # Try to open on macOS; if not available (headless), print path to open manually
            if command -v open >/dev/null 2>&1; then
              open "$FILE" || true
            else
              echo "Cannot open GUI from this Jenkins agent. Open the file manually:"
              echo "$FILE"
            fi
          else
            echo "ERROR: file not found: $FILE"
            exit 1
          fi
        '''
      }
    }
  }
}
