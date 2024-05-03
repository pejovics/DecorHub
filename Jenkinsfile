pipeline {
    agent any
    tools {
        nodejs 'Default'
    }
    stages {
        stage('Checkout') {
            steps {
                // Korak za checkout repozitorijuma
                git url: 'https://github.com/pejovics/DecorHub.git', 
                branch: 'main', 
                // Dodajte opciju za ispisivanje debag informacija
                changelog: true, 
                poll: true
            }
        }
       stage('Install dependencies') {
            steps {
                dir('./frontend') {
                    // Instalacija Angular zavisnosti
                    sh 'npm install'
                }

            }
        }
        stage('Build') {
            steps {
                dir('./frontend') {
                // Korak za izgradnju Angular projekta
                sh 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                dir('./frontend') {
                // Korak za pokretanje testova (opciono)
                // Ovo možete izostaviti ako nemate testove
                sh 'npm test'
                }
            }
        }
        // stage('Deploy') {
        //     steps {
        //    
        //         // Korak za deploy aplikacije (opciono)
        //         // Ovo možete izostaviti ako ne planirate deploy
        //         // Na primer, možete kopirati izgrađene fajlove na server
        //     }
        // }
    }

    post {
        //always {
            // Ovaj korak će se uvek izvršiti nakon svake faze
            // Na primer, ovde možete dodati korake za čišćenje ili oslobađanje resursa
        //}
        success {
            // Ovaj korak će se izvršiti samo ako je Pipeline uspešno završen
            // Na primer, ovde možete dodati korake za slanje notifikacija ili obaveštenja
            script {
                emailext subject: 'Build Success Notification',
                         body: 'Your build was successful.',
                         to: 'recipient@example.com',
                         from: 'sender@example.com'
            }
        }
        failure {
            // Ovaj korak će se izvršiti samo ako je Pipeline neuspešno završen
            // Na primer, ovde možete dodati korake za slanje obaveštenja o grešci
            script {
                emailext subject: 'Build Failure Notification',
                         body: 'Your build has failed.',
                         to: 'recipient@example.com',
                         from: 'sender@example.com'
            }
        }
    }
}
