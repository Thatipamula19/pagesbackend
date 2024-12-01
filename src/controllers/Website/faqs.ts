const faqSechema = require('../../models/Website/faqs')

exports.addFaqs = async (req, res, next) =>{
    const page = req.body.page;
    const faqs = req.body.faqs;
    const addFaqs = new faqSechema({
        page: page,
        faqs : faqs
    });

   await addFaqs.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Faqs added successfully!',
            faqs: result
          });
    })
}

exports.updateFaqs = async (req, res, next) => {
    const updatedPage = req.body.page;
    const updatedFaqs = req.body.faqs;

    let faq = await faqSechema.findOne({ page: updatedPage })
    console.log(faq)
    faq.page = updatedPage;
    faq.faqs = updatedFaqs;
    await faq.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Faqs Updated successfully!',
            faqs: result
        });
    });
}

exports.getFaqs = async (req, res, next) => {
    await faqSechema.find().then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Faqs Fetched successfully!',
            faqs: result.map(re=>{
                return {
                    page: re.page,
                    id: re._id,
                    faqs: re.faqs
                }
            })
        });
    });
}

exports.getFaq = async (req, res, next) => {
    const page = req.body.page;
    await faqSechema.find({page: page}).then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Faq Fetched successfully!',
            faqs: result
        });
    });
}

exports.deleteFaqs = async (req, res, next) => {
    const page = req.body.page
    await faqSechema.deleteOne({page:page}).then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Faqs Deleted successfully!',
            faqs: result
        });
    });
}