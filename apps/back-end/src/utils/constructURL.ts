import { config } from "common"

function construct_home_page_link(): string {

  return (config.FRONTEND_DOMAIN == 'localhost' ? `${config.FRONTEND_SSL}://www.localhost:${config.FRONTEND_PORT}`
    : `${config.FRONTEND_SSL}://${config.FRONTEND_DOMAIN}`);
}
function web_server_base_link(): string {

  return (config.WEB_SERVER_DOMAIN == 'localhost' ? `${config.WEB_SERVER_SSL}://www.localhost:${config.WEB_PORT}`
    : `${config.WEB_SERVER_SSL}://${config.WEB_SERVER_DOMAIN}`);
}
export { construct_home_page_link, web_server_base_link }
