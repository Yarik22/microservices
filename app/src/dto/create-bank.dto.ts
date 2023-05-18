import { Transform } from "class-transformer"
import { Allow } from "class-validator"

export class CreateBankDto {
    @Transform(({value}) =>  value.toLowerCase())
    @Allow()
    name:string
}
