import { config } from "common"

function construct_home_page_link(): string {

  return (config.FRONTEND_DOMAIN == 'localhost' ? `${config.FRONTEND_SSL}://localhost:${config.FRONTEND_PORT}`
    : `${config.FRONTEND_SSL}://${config.FRONTEND_DOMAIN}`);
}
function web_server_base_link(): string {

  return (config.BACKEND_DOMAIN == 'localhost' ? `${config.BACKEND_SSL}://localhost:${config.BACKEND_PORT}`
    : `${config.BACKEND_SSL}://${config.BACKEND_DOMAIN}`);
}
export { construct_home_page_link, web_server_base_link }
