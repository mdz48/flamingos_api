import { MobiliaryRepository } from "../repositories/MobiliaryRepository";
import { Mobiliary } from "../models/Mobiliary";
import { DateUtils } from "../../shared/utils/DateUtils";

export class MobiliaryService {

    public static async getAllMobiliaries(): Promise<Mobiliary[]> {
        try {
            return await MobiliaryRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener mobiliarios: ${error.message}`);
        }
    }

    public static async getMobiliaryById(mobiliaryId: number): Promise<Mobiliary | null> {
        try {
            return await MobiliaryRepository.findById(mobiliaryId);
        } catch (error: any) {
            throw new Error(`Error al encontrar mobiliario: ${error.message}`);
        }
    }

    public static async addMobiliary(mobiliary: Mobiliary) {
        try {
            mobiliary.created_at = DateUtils.formatDate(new Date());
            mobiliary.updated_at = DateUtils.formatDate(new Date());
            return await MobiliaryRepository.createMobiliary(mobiliary);
        } catch (error: any) {
            throw new Error(`Error al crear mobiliario: ${error.message}`);
        }
    }

    public static async modifyMobiliary(mobiliaryId: number, mobiliaryData: Mobiliary) {
        try {
            const mobiliaryFound = await MobiliaryRepository.findById(mobiliaryId);
            if (mobiliaryFound) {
                mobiliaryFound.name = mobiliaryData.name || mobiliaryFound.name;
                mobiliaryFound.stock = mobiliaryData.stock || mobiliaryFound.stock;
                mobiliaryFound.state = mobiliaryData.state || mobiliaryFound.state;
                mobiliaryFound.available_stock = mobiliaryData.available_stock || mobiliaryFound.available_stock;
                mobiliaryFound.deleted = mobiliaryData.deleted !== undefined ? mobiliaryData.deleted : mobiliaryFound.deleted;
            } else {
                return null;
            }
            mobiliaryFound.updated_by = mobiliaryData.updated_by;
            mobiliaryFound.updated_at = DateUtils.formatDate(new Date());
            return await MobiliaryRepository.updateMobiliary(mobiliaryId, mobiliaryFound);
        } catch (error: any) {
            throw new Error(`Error al modificar mobiliario: ${error.message}`);
        }
    }

    public static async deleteMobiliary(mobiliaryId: number): Promise<boolean> {
        try {
            return await MobiliaryRepository.deleteMobiliary(mobiliaryId);
        } catch (error: any) {
            throw new Error(`Error al eliminar mobiliario: ${error.message}`);
        }
    }
}
