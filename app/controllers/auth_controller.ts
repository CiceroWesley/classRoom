import ClassRoom from '#models/classRoom';
import User from '#models/user';
import { Hash } from '@adonisjs/core/hash';
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    async register({request, response}: HttpContext) {

        // colocar para apenas o adm registar o usuário e colocar seeder
        const {fullName, email, password, registration, date_of_birth, type} = request.all();
        try {
            const user = await User.create({fullName, email, password, registration, date_of_birth,type})

            if(!user){
                throw('Error creating user')
            }

            return response.created(user)
        } catch (error) {
            return response.internalServerError(error)
        }

    }

    async login({request, response}: HttpContext){
        const {email, password} = request.body();

        try {
            const user = await User.verifyCredentials(email, password);
            const token = await User.accessTokens.create(user);

            return response.ok({
                token: token,
                ...user.serialize(),
              })

        } catch (error) {
            return response.internalServerError(error)
        }

    }

    async logout({auth, response}: HttpContext){
        try {
            const user = auth.getUserOrFail();
            const token = auth.user?.currentAccessToken.identifier;

            if(!token){
                return response.badRequest({message: 'Token not found'});
            }

            await User.accessTokens.delete(user,token);
            return response.ok({message: 'Logged out'});
        } catch (error) {
            return response.internalServerError(error);
        }
    }
}