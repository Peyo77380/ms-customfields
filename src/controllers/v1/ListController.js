const log4js = require("log4js")
const config = require("config")
const logger = log4js.getLogger("ListController")
logger.level = config.get("log.level")

const ListService = require("../../services/ListService")
const ListRequest = require("../../requests/ListRequest")
const ResponseUtils = require("../../utils/ResponseUtil")

const {validationResult} = require("express-validator")

module.exports = {
  getList: async () => {
    ResponseUtils.success(await ListService.find())
  },
  get: async function (req) {
    try {
      const List = await ListService.findOne(req.params.id)
      ResponseUtils.success(List)
    } catch (error) {
      logger.debug("error", error)
      return ResponseUtils.errorsNotFound()
    }
  },
  getByWlAndLangAndKey: async function (req) {

    try {
      const List = await ListService.findByWlAndLangAndKey(req.params)
      ResponseUtils.success(List)
    } catch (error) {
      return ResponseUtils.errorsNotFound()
    }
  },
  getByWlAndLang: async function (req) {

    try {
      const Lists = await ListService.findByWlAndLang(req.params)
	  Lists.forEach(element => {
		const count = element.datas.length 
		element.count = count
      	delete element.datas
	  });
	  console.log(Lists)
      ResponseUtils.success(Lists)
    } catch (error) {
      return ResponseUtils.errorsNotFound()
    }
  },
  addData: async function (req) {
    try {
      const ListEdited = await ListService.addListData(req.params.id, req.body)
      ResponseUtils.successEdited(req.params.id, req.body, ListEdited)
    } catch (error) {
      ResponseUtils.errorsNotFound()
      logger.debug("edit error : ", error)
    }
  },
  editData: async function (req) {
    try {
      const ListEdited = await ListService.editListData(req.params.id, req.body)
      ResponseUtils.successEdited(req.params.id, req.body, ListEdited)
    } catch (error) {
      ResponseUtils.errorsNotFound()
      logger.debug("edit error : ", error)
    }
  },
  removeData: async function (req) {
    try {
      const ListEdited = await ListService.removeListData(
        req.params.id,
        req.body
      )
      ResponseUtils.successEdited(req.params.id, req.body, ListEdited)
    } catch (error) {
      ResponseUtils.errorsNotFound()
      logger.debug("edit error : ", error)
    }
  },
}
