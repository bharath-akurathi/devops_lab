pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh '''
          DEPLOY="$HOME/devops_lab_site"
          mkdir -p "$DEPLOY"
          cp -f website/Event_registration.html "$DEPLOY"/Event_registration.html
        '''
      }
    }

    stage('Serve') {
      steps {
        sh '''
          DEPLOY="$HOME/devops_lab_site"
          FILE="$DEPLOY/Event_registration.html"
          open "$FILE"
        '''
      }
    }
  }
}
