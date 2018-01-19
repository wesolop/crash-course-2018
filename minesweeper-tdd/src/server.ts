import {Router} from 'express';
import * as wixRunMode from 'wix-run-mode';
import * as ejs from 'ejs';
import * as wixExpressCsrf from 'wix-express-csrf';
import * as wixExpressRequireHttps from 'wix-express-require-https';
import {readFileSync} from 'fs';

module.exports = (app: Router, context) => {
  const config = context.config.load('minesweeper-tdd');
  const templatePath = './src/index.ejs';
  const templateFile = readFileSync(templatePath, 'utf8');
  const isProduction = wixRunMode.isProduction();

  app.use(wixExpressCsrf());
  app.use(wixExpressRequireHttps);

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
