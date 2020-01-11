import * as SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm'

export default class RecipeDB extends BaseModel {
    constructor(obj) {
        super(obj);
    }

    static get database() {
        return async () => SQLite.openDatabase('database.db')
    }

    static get tableName() {
        return 'Recipes'
    }

    static get columnMapping() {
        return {
            id: { type: types.INTEGER, primary_key: true },
            name: { type: types.TEXT, not_null: true },
            tags: { type: types.JSON },
            description: { type: types.TEXT },
            created_at: { type: types.INTEGER, default: () => Date.now() }
        }
    }
}