import { SQLite } from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm'

export default class IngredientDB extends BaseModel {
    constructor(obj) {
        super(obj);
    }

    static get database() {
        return async () => SQLite.openDatabase('database.db')
    }

    static get tableName() {
        return 'Ingredient'
    }

    static get columnMapping() {
        return {
            id: { type: types.INTEGER, primary_key: true },
            name: { type: types.TEXT, not_null: true },
            stocked: { type: types.INTEGER, not_null: true, default: () => 0 },
            measurement: { type: types.TEXT },
            created_at: { type: types.INTEGER, default: () => Date.now() }
        }
    }
}