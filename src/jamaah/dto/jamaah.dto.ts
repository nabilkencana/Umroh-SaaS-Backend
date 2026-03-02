import { IsString, IsOptional } from 'class-validator';

export class CreateJamaahDto {
    @IsString()
    full_name: string;

    @IsString()
    passport_number: string;

    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    branch_id?: string;

    @IsString()
    tenant_id: string;
}

export class UpdateJamaahDto {
    @IsOptional()
    @IsString()
    full_name?: string;

    @IsOptional()
    @IsString()
    passport_number?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    branch_id?: string;
}
