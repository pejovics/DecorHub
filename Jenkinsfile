pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Korak za checkout repozitorijuma
                git 'https://github.com/pejovics/DecorHub.git'
            }
        }
       stage('Install dependencies') {
            steps {
                // Instalacija Angular zavisnosti
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                // Korak za izgradnju Angular projekta
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // Korak za pokretanje testova (opciono)
                // Ovo možete izostaviti ako nemate testove
                sh 'npm test'
            }
        }
        // stage('Deploy') {
        //     steps {
        //         // Korak za deploy aplikacije (opciono)
        //         // Ovo možete izostaviti ako ne planirate deploy
        //         // Na primer, možete kopirati izgrađene fajlove na server
        //     }
        // }
    }

    post {
        always {
            // Ovaj korak će se uvek izvršiti nakon svake faze
            // Na primer, ovde možete dodati korake za čišćenje ili oslobađanje resursa
        }
        success {
            // Ovaj korak će se izvršiti samo ako je Pipeline uspešno završen
            // Na primer, ovde možete dodati korake za slanje notifikacija ili obaveštenja
        }
        failure {
            // Ovaj korak će se izvršiti samo ako je Pipeline neuspešno završen
            // Na primer, ovde možete dodati korake za slanje obaveštenja o grešci
        }
    }
}
