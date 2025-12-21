## Taant Tantra App 
 This is a monorepo containing all the services.

### Technologies
 - Valkey
 - localstack (for local S3 compliant storage testing) / DigitalOcean Spaces for prod.
 - OpenSearch (for complex product search queries) / SQL queries for simple search queries.
 - For the database I went with Supabase (PostgreSQL).
 - For the back-end I aim to write most of the code using composition, closures and not through object prototype chain/ inheritance.
 - For testing I will either use vitest or jest.
 
 NOTE: All the assets currently present in the front-end's source have not been used publicly or commercially.


### Naming convention/ rules
 - exported Functions will be a mix of camel case and snake case for e.g. function some_Function();
 - Functions which are not exported should be named for e.g. f_createAppService();
 - The parameters of a function will be camel case. e.g. function some_Function(someVariable: number);
 - Types and Interface identifiers/names will be Pascal case.
 - variables, constants, literals defined inside a function will be in snake case. e.g. const local_variable: number = 5;
 - global constants need to be in snake case but in all uppercase. e.g. export const GLOBAL_CONSTANT: string = "e-commerce" as const;
 - constants, variables, literals in the outer most scope which are not exported, may be prefixed with a small case g and _ . e.g. const g_REQUEST_OK: number = 200;
 - Objects, Classes, where ever they are defined, need to be in Pascal case.

