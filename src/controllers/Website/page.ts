import e from "express";

const pageSchema = require('../../models/Website/page')

exports.addPage = async (req, res, next) =>{
    const request = req.body
    const addPage = new pageSchema({
        page: request?.page,
        pageUrl: request?.pageUrl,
        banners: request?.banners,
        keyFeatures : request?.keyFeatures,
        faqs : request?.faqs
    });

   await addPage.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'page added successfully!',
            data: result
          });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message: 'page not added successfully!',
            data: err
          });
    })
}

exports.updatePage = async (req, res, next) => {
    const updatedPage = req.body
    let page = await pageSchema.findOne({ page: updatedPage?.page })
    console.log(page)
    page.page = updatedPage?.page;
    page.banners = updatedPage?.banners;
    page.keyFeatures = updatedPage?.keyFeatures;
    page.faqs = updatedPage?.faqs;
    await page.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Page Updated successfully!',
            data: result
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message: 'page not updated successfully!',            
            data: err
          });    
    })
}

exports.getPages = async (req, res, next) => {
    await pageSchema.find().then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Pages Fetched successfully!',
            data: result.map(re=>{
                return {
                    page: re.page,
                    pageUrl: re.pageUrl,
                    id: re._id,
                    data: re
                }
            })
        });
    });
}

exports.getPage = async (req, res, next) => {
    const pageUrl = req.body.pageUrl;
    await pageSchema.find({pageUrl: pageUrl}).then(result => {
        console.log(result)
        if(result.length > 0){
            res.status(200).json({
                message: 'Page Fetched successfully!',
                data: result
            });
        } else {
            res.status(404).json({
                message: 'Page not found!',
                data: result
            });
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message: 'page not fetched successfully!',            
            data: err
          });    
    })
}

exports.deletePage = async (req, res, next) => {
    const page = req.body.page
    await pageSchema.deleteOne({page:page}).then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Page Deleted successfully!',
            data: result
        });
    });
}