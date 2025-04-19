import { normalize, SendMsgBase } from '@/onebot/action/msg/SendMsg';
import { OB11PostSendMsg } from '@/onebot/types';
import { ActionName } from '@/onebot/action/router';

// 未验证
export class GoCQHTTPSendForwardMsgBase extends SendMsgBase {
    protected override async check(payload: OB11PostSendMsg) {
        if (payload.messages) payload.message = normalize(payload.messages);
        return super.check(payload);
    }
}
export class GoCQHTTPSendForwardMsg extends GoCQHTTPSendForwardMsgBase {
    override actionName = ActionName.GoCQHTTP_SendForwardMsg;

    protected override async check(payload: OB11PostSendMsg) {
        if (payload.messages) payload.message = normalize(payload.messages);
        return super.check(payload);
    }
}
export class GoCQHTTPSendPrivateForwardMsg extends GoCQHTTPSendForwardMsgBase {
    override actionName = ActionName.GoCQHTTP_SendPrivateForwardMsg;
}

export class GoCQHTTPSendGroupForwardMsg extends GoCQHTTPSendForwardMsgBase {
    override actionName = ActionName.GoCQHTTP_SendGroupForwardMsg;
}
