import * as SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm'

export default class RecipeIngredientLinkDB extends BaseModel {
    constructor(obj) {
        super(obj);
    }

    static get database() {
        return async () => SQLite.openDatabase('database.db')
    }

    static get tableName() {
        return 'RecipeIngredientLinkDB'
    }

    static get columnMapping() {
        return {
            id: { type: types.INTEGER, primary_key: true },
            RecipeId: { type: types.INTEGER, not_null: true },
            IngredientId: { type: types.INTEGER, not_null: true }
        }
    }
}