import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium-min';
import GenerateReport from './PdfHtmls/GenerateReport';
import GenerateCertificate from './PdfHtmls/GenerateCertificate';
require("dotenv").config();
exports.generateReport = async (req, res, next) => {
    const payload = await req.body;
    try {
        const htmlContent = await GenerateReport(payload?.testData, payload?.reportData?.advanced_report?.[0]);
        const browser = await puppeteer.launch({
            headless: true,
            // args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files', '--enable-local-file-accesses', "--disable-gpu", "--disable-setuid-sandbox", "--no-sandbox", "--no-zygote"],
            args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
            // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // this is for local
            executablePath: await chromium.executablePath("https://s3.ap-south-1.amazonaws.com/ilwebsite2.devinfinitylearn.in/npm-libraries/chromium-v130.0.0-pack.tar"),
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            printBackground: true,
            format: "A4"
        });
        await browser.close();
        res.setHeader("Accept", "*/*");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
        res.setHeader("Content-Length", pdfBuffer.length);
        res.status(200);
        res.end(pdfBuffer);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || "Failed to generate PDF",
        });
    }
};

exports.generateCertificate = async (req, res, next) => {
    try {
        const payload = await req.body;
        const htmlContent = GenerateCertificate(payload?.testData);
        const browser = await puppeteer.launch({
            headless: true,
            // args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files', '--enable-local-file-accesses', "--disable-gpu", "--disable-setuid-sandbox", "--no-sandbox", "--no-zygote"],
            args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox', "--single-process", "--no-zygote"],
            defaultViewport: chromium.defaultViewport,
            // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // this is for local
            executablePath: await chromium.executablePath("https://s3.ap-south-1.amazonaws.com/ilwebsite2.devinfinitylearn.in/npm-libraries/chromium-v130.0.0-pack.tar"),
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({
            printBackground: true,
            width: "9in",
            height: "6.2in"
        });

        await browser.close();
        res.setHeader("Accept", "*/*");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=certificate.pdf");
        res.setHeader("Content-Length", pdfBuffer.length);
        res.status(200);
        res.end(pdfBuffer);

    } catch (error:any) {
        res.status(500).json({
            error: error.message || "Failed to generate PDF",
        });
    }
}