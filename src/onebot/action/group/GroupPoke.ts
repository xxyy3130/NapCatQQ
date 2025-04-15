import { ActionName } from '@/onebot/action/router';
import { GetPacketStatusDepends } from '@/onebot/action/packet/GetPacketStatus';
import { z } from 'zod';

const SchemaData = z.object({
    group_id: z.coerce.string(),
    user_id: z.coerce.string(),
});

type Payload = z.infer<typeof SchemaData>;

export class GroupPoke extends GetPacketStatusDepends<Payload, void> {
    override actionName = ActionName.GroupPoke;
    override payloadSchema = SchemaData;

    async _handle(payload: Payload) {
        await this.core.apis.PacketApi.pkt.operation.GroupPoke(+payload.group_id, +payload.user_id);
    }
}
