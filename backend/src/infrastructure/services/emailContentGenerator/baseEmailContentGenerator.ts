export abstract class BaseEmailContentGenerator {
    generateHeader(): string {
        return `
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding:40px 0;">
                <tr>
                    <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="width:600px; padding:0 20px;">

                    </table>
                    </td>
                </tr>
            </table>
        `
    }

    generateFooter():string{
        return `
             <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-top:1px solid #dddddd; padding:20px 0;">
                <tr>
                    <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="width:600px;">
                        <tr>
                        <td align="center" style="padding:10px 20px;">
                            <p style="font-size:12px; color:#888888; margin:0;">
                            &copy; 2025 Homie. All rights reserved.
                            </p>
                            <p style="font-size:12px; color:#888888; margin:5px 0 0;">
                            <a href="#" style="color:#000000; text-decoration:none;">Privacy Policy</a> &nbsp;|&nbsp; 
                            </p>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
            </table>
        `
    }

    htmlWrapper(body: string): string {
        return `
            <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Homie</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0; padding:0; background-color:#ffffff; font-family:Arial, sans-serif;">
                    ${body}
                  </body>
                </html>
        `
    }
}