//const Subject = use("App/Models/Subject")

const Category = require("../app/Models/Category")

class CategoryUtil {
    constructor(CategoryModel){
        this._Category = CategoryModel
    }

    getAll(references){
        const categories = this._Category.query()

        return this._withReferrnces(categories).fetch()
    }

    getById(categoryId,references){
        const category = this._Category
        .query()
        .where('category_id', categoryId)

        return this._withReferrnces(category)
        .fetch()
        .then(response => response.first())
    }
    async create(categoryInstance, references){
        const categoryId = await Category.create(categoryInstance)
        const category =  this._Category
        .query()
        .where('category_id', categoryId)

        return this._withReferrnces(category,references)
        .fetch()
        .then(response => response.first())
    }

    _withReferrnces(instance,references){
        if(references){
            const extractedReferences = references.split(",")
            instance.with(extractedReferences)
        }
        return instance
    }    
}


module.exports = SubjectUtil