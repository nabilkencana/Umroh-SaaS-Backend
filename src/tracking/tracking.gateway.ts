import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TrackingService } from './tracking.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class TrackingGateway {
    @WebSocketServer()
    server: Server;

    constructor(private trackingService: TrackingService) { }

    @SubscribeMessage('join')
    handleJoin(@MessageBody() data: { tenant_id: string }, @ConnectedSocket() client: Socket) {
        client.join(`tenant_${data.tenant_id}`);
        return { event: 'joined', data: { tenant_id: data.tenant_id } };
    }

    @SubscribeMessage('location_update')
    async handleLocationUpdate(
        @MessageBody() data: {
            tenant_id: string;
            jamaah_id: string;
            latitude: number;
            longitude: number;
            status: string;
        },
    ) {
        const log = await this.trackingService.create(data);

        this.server.to(`tenant_${data.tenant_id}`).emit('tracking_update', log);

        return { event: 'location_updated', data: log };
    }
}
