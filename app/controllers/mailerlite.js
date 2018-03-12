
const request = require('async-request')
// const groupService = require('./../services/group');
const apiKey = process.env.apiKey;
const https = require('https');
const Calcgroup = require('./../models/calcgroup');
const mailer = {

    index: async (req, res, next) => {
        try {
            let reqs = await request('https://api.outgrow.co/api/v1/calculator?status=Live&type=Both&sort=alpha_asc', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'API-Key': '24d1e4cd5576db3e748e1e761b45f3'
                }
            });
            let calc = JSON.parse(reqs.body).data;
            reqs = await request('https://api.mailerlite.com/api/v2/groups', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'X-MailerLite-ApiKey': apiKey
                }
            });
            let linkData = await Calcgroup.find({})
            res.render('pages/index', {groups: JSON.parse(reqs.body), calcs: calc,linkdata:linkData});
        } catch (error) {
            console.log(error)
        }
    },
    link: async (req, res, next) => {
        try {
            let calcgroup = new Calcgroup(req.body);
            await calcgroup.save();
            let groups = await Calcgroup.find({active: true});
            res.status(200).json(groups)
        } catch (err) {
            console.log(err);
        }
    },
    addsubscribertogroup: async (req, res, next) => {
        try {
                let data = req.body
                let calcgroup = await Calcgroup.findOne({calcPid:data.calcPid},{mlgid:1})
                console.log(calcgroup)
                let reqs = await request('https://api.mailerlite.com/api/v2/groups/'+calcgroup.mlgid+'/subscribers', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'X-MailerLite-ApiKey': apiKey
                    },
                    data: data.leads
                });
                const resp = successConst.OK;
                resp.data = reqs.body;
                respond.success(res, resp);
            } catch (error) {
                console.log(error)
            }
        }
};

module.exports = mailer; 