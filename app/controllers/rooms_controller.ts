import ClassRoom from '#models/classRoom';
import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'

export default class RoomsController {
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
}