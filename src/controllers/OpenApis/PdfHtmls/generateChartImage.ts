import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium-min';

export default async function generateChartImage(array) {
    const htmlContent = `
        <html>
        <head>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body>
            <div style="width: 400px; height: 400px; margin: 0 auto;">
                <canvas id="myChart"></canvas>
            </div>
            <script>
                var ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: ${JSON.stringify(array)},
                            backgroundColor: ['#00AD6F', '#FF5353', '#ddd'],
                            borderColor: ['#000'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        cutoutPercentage: 60,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'right',
                                labels: {
                                    fontSize: 12,
                                    usePointStyle: true,
                                    padding: 30
                                }
                            }
                        }
                    }
                });
                // Wait for the chart to render fully
                setTimeout(() => {
                    window.chartRendered = true;
                }, 1000);
            </script>
        </body>
        </html>
    `;
    const browser = await puppeteer.launch({
        // headless: chromium.args,
        // args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files', '--enable-local-file-accesses', "--disable-gpu", "--disable-setuid-sandbox", "--no-sandbox", "--no-zygote"],
        args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
        // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // this is for local
        executablePath: await chromium.executablePath("https://s3.ap-south-1.amazonaws.com/ilwebsite2.devinfinitylearn.in/npm-libraries/chromium-v130.0.0-pack.tar"),
    });
    const page:any = await browser.newPage();
    await page.setViewport({ width: 500, height: 500 });
    await page.setContent(htmlContent);
    await page.waitForFunction(() => (window as any).chartRendered === true);
    const chartImage = await page.screenshot({ encoding: 'base64', fullPage: true });
    await browser.close();

    return `data:image/png;base64,${chartImage}`;
}