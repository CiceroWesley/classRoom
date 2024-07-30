import ClassRoom from '#models/classRoom';
import StudentRoom from '#models/studentRoom';
import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import { userInfo } from 'os';

export default class UsersController {
    async showAll({request, response, auth}: HttpContext){
        
        try {
            // verify if is adm and authorized
            const user = auth.getUserOrFail();
            if(user && user.type === 0){
                
                // get user by id
                const user = await User.all();

                return response.ok(user)
                
            } else {
                throw('Level of unauthorized access')
            }
            
          } catch (error) {
            return response.unauthorized({error})
          }
    }

    async show({request, response, auth}: HttpContext){
        const id = request.param('id')
        
        try {
            // verify if is adm and authorized
            const user = auth.getUserOrFail();
            if(user && user.type === 0){
                
                // get user by id
                const user = await User.findOrFail(id)

                return response.ok(user)
                
            } else {
                throw('Level of unauthorized access')
            }
            
          } catch (error) {
            return response.unauthorized({error})
          }
    }

    async showClasses({request, response, auth}: HttpContext){
        try {
            // verify if is student and authorized
            const user = auth.getUserOrFail();
            if(user && user.type === 1){
                
                // get user by id
                const studentRoom = await StudentRoom.findManyBy('id_user', user?.id)

                let classes:number[] = [];
                if(studentRoom){
                    
                    const classPromises = studentRoom.map(async (stuRo) => {
                        const classRoom = await ClassRoom.find(stuRo.id_classroom);
                        if (classRoom) {
                            return classRoom.number;
                        }
                        return null;
                    });

                    const classNumbers = await Promise.all(classPromises);
                    const filteredClasses = classNumbers.filter(num => num !== null);

                    
                    return response.ok({ user: user.fullName, classes: filteredClasses });

                }
                // pegar o numero da turma da relação do student room
                // criar seeder
                
                
            } else {
                throw('Level of unauthorized access')
            }
            
          } catch (error) {
            return response.unauthorized({error})
          }
    }

    async update({request, response, auth}: HttpContext){
        const id = request.param('id')
        
        try {
            // verify if is adm and authorized
            const user = auth.getUserOrFail();
            if(user && user.type === 0){
                const body = request.all();
                
                // update user by id
                const user = await User.findOrFail(id)
                user.fullName = body.fullName
                user.email = body.email
                user.password = body.password
                user.registration = body.registration
                user.date_of_birth = body.date_of_birth

                await user.save()

                return response.ok(user)
                
            } else {
                throw('Level of unauthorized access')
            }
            
          } catch (error) {
            return response.unauthorized({error})
          }
    }

    async destroy({request, response, auth}: HttpContext){
        const id = request.param('id')

        try {
            // verify if is adm and authorized
            const user = auth.getUserOrFail();
            if(user && user.type === 0){
                const user = await User.findOrFail(id)
                await user.delete()
                return response.ok(user);


            } else {
                throw('Level of unauthorized access')
            }
            
        } catch (error) {
            return response.unauthorized(error)
        }
    }
}