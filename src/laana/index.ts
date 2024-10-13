import { InstanceContext, NapCatCore } from '@/core';
import { NapCatPathWrapper } from '@/common/path';
import { LaanaFileUtils } from './utils/file';
import { LaanaMessageUtils } from './utils/message';
import { LaanaActionHandler } from './action';
import { LaanaMessageActionImpl } from './action/message';
import { LaanaConfigLoader } from './config';
import { LaanaNetworkManager } from './network';
import { LaanaWsServerAdapter } from './network/ws-server';
import { LaanaContactActionImpl } from '@/laana/action/contact';

export class NapCatLaanaAdapter {
    utils = {
        msg: new LaanaMessageUtils(this.core, this),
        file: new LaanaFileUtils(this.core, this),
    };
    actions: LaanaActionHandler;
    configLoader: LaanaConfigLoader;
    networkManager: LaanaNetworkManager;

    constructor(
        public core: NapCatCore,
        public context: InstanceContext,
        public pathWrapper: NapCatPathWrapper,
    ) {
        this.actions = {
            ...new LaanaMessageActionImpl(this.core, this).handler,
            ...new LaanaContactActionImpl(this.core, this).handler,
        };
        this.configLoader = new LaanaConfigLoader(this.core, this.pathWrapper.configPath);

        this.networkManager = new LaanaNetworkManager();
        if (this.configLoader.configData.network.ws.enabled) {
            this.networkManager.registerAdapterAndOpen(
                new LaanaWsServerAdapter(
                    this.configLoader.configData.network.ws.ip,
                    this.configLoader.configData.network.ws.port,
                    this.configLoader.configData.network.ws.heartbeat.enabled,
                    this.configLoader.configData.network.ws.heartbeat.interval,
                    this.configLoader.configData.network.ws.token,
                    this.core,
                    this,
                ),
            );
        }

        this.utils.msg.installEventListeners();
    }
}
