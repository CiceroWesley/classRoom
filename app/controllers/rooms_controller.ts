import ClassRoom from '#models/classRoom';
import StudentRoom from '#models/studentRoom';
import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db';

export default class RoomsController {
    async show({request, response, auth}: HttpContext){
        const id = request.param('id')
        
        try {
            // verify if is adm and authorized
            const user = auth.getUserOrFail();
            if(user && user.type === 0){
                
                // get user by id
                const classRoom = await ClassRoom.findOrFail(id)

                return response.ok(classRoom)
                
            } else {
                throw('Level of unauthorized access')
            }
            
          } catch (error) {
            return response.unauthorized({error})
          }
    }


    async store({request, response, auth}: HttpContext){
        try {
            // verify if is adm and authorized
            const user = auth.getUserOrFail();
            
            if(user && user.type === 0){
                const {number, capacity} = request.all();
                
                const classRoom = await ClassRoom.create({number, capacity, user_id: user.id})
                if(!classRoom){
                    throw('Error creating classroom')
                }

                return response.created(classRoom)
                
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
            let msg
            if(user && user.type === 0){
                const body = request.body();
                
                // update classroom by id
                const classRoom = await ClassRoom.findOrFail(id)
                classRoom.number = body.number
                if(body.capacity >= classRoom.capacity){
                    classRoom.capacity = body.capacity
                } else {
                    msg = 'The new capacity must be greater or equal than the current one'
                }
                

                await classRoom.save()

                return response.ok({classRoom, msg})
                
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
                const classRoom = await ClassRoom.findOrFail(id)
                await classRoom.delete()
                return response.ok(classRoom);


            } else {
                throw('Level of unauthorized access')
            }
            
        } catch (error) {
            return response.unauthorized(error)
        }
    }

    async assignUser({request, response, auth}: HttpContext){
        try {
            // verify if is adm and authorized
            const user = auth.getUserOrFail();
            
            if(user && user.type === 0){
                const {id_user, id_classroom} = request.all();

                const student = await User.findByOrFail(id_user);
                const classRoom = await ClassRoom.findByOrFail(id_classroom)

                if(!student || !classRoom){
                    throw('Student or classroom does not exist')
                }
                if(classRoom.availability){
                    const studentRoom = await StudentRoom.create({id_user, id_classroom})
                    if(!studentRoom){
                        throw('Error creating studentRoom')
                    }

                    const studentInClassRoom = await db.from('student_rooms').where('id_classroom', id_classroom).count('*','total')
                    if(studentInClassRoom[0].total >= classRoom.capacity){
                        classRoom.availability = false
                        classRoom.save()
                    }
                    

                    return response.created(studentRoom)
                } else {
                    throw('Classroom is not availabity')
                }
                
            } else {
                throw('Level of unauthorized access')
            }
            
          } catch (error) {
            return response.unauthorized({error})
          }

    }
}