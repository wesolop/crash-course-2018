import 'regenerator-runtime/runtime';
import wixRunMode from 'wix-run-mode';
import ejs from 'ejs';
import wixExpressCsrf from 'wix-express-csrf';
import wixExpressRequireHttps from 'wix-express-require-https';
import {readFileSync} from 'fs';

module.exports = (app, context) => {
  const config = context.config.load('node-workshop');
  const templatePath = './src/index.ejs';
  const templateFile = readFileSync(templatePath, 'utf8');
  const isProduction = wixRunMode.isProduction();
  const commentsRpc = aspects => context.rpc
    .clientFactory(config.comments, 'CommentsService')
    .client(aspects);
  app.use(wixExpressCsrf());
  app.use(wixExpressRequireHttps);

  app.get('/comments/:siteId', async (req, res) => {
    const rpcResponse = await commentsRpc(req.aspects)
      .invoke('fetch', req.params.siteId);
    res.json(rpcResponse);
  });

  app.get('/', (req, res) => {
    const renderModel = getRenderModel(req);
    const html = ejs.render(templateFile, renderModel, {cache: isProduction, filename: templatePath});
    res.send(html);
  });

  function getRenderModel(req) {
    return {
      locale: req.aspects['web-context'].language,
      basename: req.aspects.basename,
      debug: req.aspects['web-context'].debug || process.env.NODE_ENV === 'development',
      newrelic: req.app.locals.newrelic.getBrowserTimingHeader(),
      clientTopology: config.clientTopology,
      title: 'Wix Full Stack Project Boilerplate'
    };
  }

  return app;
};
