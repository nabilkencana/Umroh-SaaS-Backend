import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
    private app: admin.app.App;

    constructor(private configService: ConfigService) { }

    onModuleInit() {
        this.app = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: this.configService.get('FIREBASE_PROJECT_ID'),
                privateKey: this.configService.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
                clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
            }),
        });
    }

    getAuth() {
        return admin.auth();
    }

    getFirestore() {
        return admin.firestore();
    }

    getStorage() {
        return admin.storage();
    }

    async verifyIdToken(token: string) {
        return this.getAuth().verifyIdToken(token);
    }
}
