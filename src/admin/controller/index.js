'use strict';

import Base from './base.js';

var os = require('os');
var cmd = require("cmd-exec");

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file login_index.html
        return this.display();
    }

    async welcomeAction() {

        let model = this.model('mysql');
        let result = await model.execute('select version()');

        this.info = {};
        let arch = os.arch();
        let cpus = [];
        for (let i = 0; i < os.cpus().length; i++) {
            cpus[i] = os.cpus()[i]['model'];
        }
        let platform = os.platform();
        let freemem = getPrintSize(os.freemem());
        let release = os.release();
        let type = os.type();


        let runTime = os.uptime();

        this.info['platform'] = platform;
        this.info['arch'] = arch;
        this.info['freemem'] = freemem;
        this.info['release'] = release;
        this.info['type'] = type;
        this.info['runTime'] = runTime;
        this.info['cpu'] = cpus;
        let conf = think.config('web');
        if (conf['version'] == undefined) {
            conf['version'] = {};
            let cmdLine = cmd.init();
            let msg = await cmdLine.exec("node -v");
            if (msg['message'] != undefined) {
                conf['version']['node'] = msg['message'];
            }
            msg = await cmdLine.exec("npm -v");
            if (msg['message'] != undefined) {
                conf['version']['npm'] = msg['message'];
            }
        }
        let port = think.port || think.config('port');
        let websocketStatus = think.config('websocket.on') ? 'open' : 'closed';
        let clusterStatus = think.config('cluster_on') ? 'open' : 'closed';
        let env = think.env;
        let tkv = think.version;
        let appConf = {
            port: port, websocketStatus: websocketStatus, clusterStatus: clusterStatus, env: env, tkv: tkv
        };
        this.info['version'] = conf['version'];
        this.info['mysql_v'] = result[0]['version()'];
        this.info['appConf'] = appConf;

        return this.display();
    }


}