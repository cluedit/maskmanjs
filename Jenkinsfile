pipeline {
  agent any
  stages {
    stage('Dependencies Build') {
      parallel {
        stage('Service Build') {
          steps {
            sleep 1
          }
        }

        stage('Api Build') {
          steps {
            sleep 1
          }
        }

      }
    }

    stage('Build') {
      parallel {
        stage('Front Build') {
          steps {
            sleep 1
          }
        }

        stage('Mobile Build') {
          steps {
            sleep 1
          }
        }

        stage('Admin Build') {
          steps {
            sleep 1
          }
        }

      }
    }

    stage('Deploy') {
      steps {
        sleep 1
      }
    }

  }
}