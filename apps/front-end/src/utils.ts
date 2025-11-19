function construct_home_page_link(): string {

  return (__CONFIG__.FRONTEND_DOMAIN == 'localhost' ? `${__CONFIG__.FRONTEND_SSL}://www.localhost:${__CONFIG__.FRONTEND_PORT}`
    : `${__CONFIG__.FRONTEND_SSL}://${__CONFIG__.FRONTEND_DOMAIN}`);
}
function web_server_base_link(): string {

  return (__CONFIG__.BACKEND_DOMAIN == 'localhost' ? `${__CONFIG__.BACKEND_SSL}://www.localhost:${__CONFIG__.BACKEND_PORT}`
    : `${__CONFIG__.BACKEND_SSL}://${__CONFIG__.BACKEND_DOMAIN}`);
}
export { construct_home_page_link, web_server_base_link }
