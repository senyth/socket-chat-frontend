/**
 * Name:          Chat Model
 * Description:   Model that contains the fields for chat
 * Developer:     Babie Entoma
 * Date:          07/03/2019
 */

export interface Chat {
    user_id: string;
    message: string;
    timestamp: Date;
    dis: boolean;
}
