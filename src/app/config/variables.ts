import { env } from "../environment/environment.test";
import { environment } from "../../environments/environment";

export const user = 'CARDIF';
export const password = '9B9CB6631B27AA1DF47DB351B497004810015B09';

// export const URL = `${env.protocol}://${env.host}:${env.port}/${env.gate}`;
export const URL = `${environment.protocol}://${environment.host}/${environment.gate}`;