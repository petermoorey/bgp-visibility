import os
# requires 'sendgrid' PIP module
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
# requires 'jinja2' PIP module
from jinja2 import Template


def send_email(event, context):
    """Triggered by a change to a Firestore document.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
    html = '''
    <html>
        <head>
            <style>
                body {
                    font-family: 'Arial', 'Geneva', 'Verdana', 'sans-serif';
                    background-color: lightgrey;
                    color: rgba(0, 0, 0, 0.781);
                }
                td {text-align: center; vertical-align: middle; padding: 15px;}
                table {width: 100%}
                p {font-size: medium;}
                #header {
                    background-color: rgb(44, 43, 43);
                    color: white;
                    padding: 10px
                    }
                #button {
                    background-color: rgb(44, 43, 43);
                    color: white;
                    padding-top: 100px;
                    padding: 15px 25px;
                    border-radius: 5px;
                    font-size: medium;
                    }
                #card {
                    background-color: white;
                    color: darkgrey;
                    padding: 10px !imp;
                    font-size: medium;
                }
            </style>
        </head>
        <body>
            <table card>
                <tr id="header">
                    <td>
                        <h3>BGP Routing Insights - Event Notification</h3>
                    </td>
                </tr>
                <tr id="card">
                    <td>
                        <h1>{{ event_name }} for network {{ network }}</h3>
                    </td>
                </tr>
            </tr>
            <tr>
                <td>
                    <p>{{ event_description }}</h3>
                </td>
            </tr>
            <tr>
                <td>
                    <p></p>
                    <a href="https://bgprouting.net"><span id="button">View Details</span></a>
                </td>
            </tr>        
            </table>
        </body>
    </html>
    '''
    # get event data
    to_emails = event['value']['fields']['toEmail']['stringValue']
    from_email = event['value']['fields']['fromEmail']['stringValue']
    subject = event['value']['fields']['subject']['stringValue']
    network = event['value']['fields']['network']['stringValue']
    event_name = event['value']['fields']['eventName']['stringValue']
    event_description = event['value']['fields']['eventDescription']['stringValue']

    # render email content
    t = Template(html)
    html_content = t.render(network=network, event_name=event_name, event_description=event_description)

    # construct email
    message = Mail(
        to_emails=to_emails,
        from_email=from_email,
        subject=subject,
        html_content=html_content)

    # send email
    sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
