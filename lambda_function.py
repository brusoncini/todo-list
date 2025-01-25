import json
import boto3
import time
from botocore.exceptions import ClientError

# Configurar o cliente do DynamoDB
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('tasks')

def lambda_handler(event, context):
    # Headers de CORS
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
    }

    # Lidando com o método OPTIONS
    if event['httpMethod'] == "OPTIONS":
        return {
            "statusCode": 204,
            "headers": cors_headers,
            "body": None
        }

    http_method = event['httpMethod']
    
    try:
        if http_method == 'GET':
            response = get_tasks()
        elif http_method == 'POST':
            response = create_task(event)
        elif http_method == 'DELETE':
            response = delete_task(event)
        else:
            response = {
                'statusCode': 405,
                'body': json.dumps({'error': 'Método não permitido'})
            }

    except ClientError as e:
        response = {
            'statusCode': 500,
            'body': json.dumps({'error': e.response['Error']['Message']})
        }
    except Exception as e:
        response = {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

    response['headers'] = cors_headers
    return response

def get_tasks():
    try:
        response = table.scan()
        return {
            'statusCode': 200,
            'body': json.dumps(response['Items'])
        }
    except ClientError as e:
        raise e

def create_task(event):
    body = json.loads(event['body'])
    task_id = body.get('id', str(int(time.time() * 1000)))
    task_name = body['name']
    completed = body.get('completed', False)

    try:
        table.put_item(
            Item={
                'id': task_id,
                'name': task_name,
                'completed': completed
            }
        )
        return {
            'statusCode': 201,
            'body': json.dumps({'message': 'Tarefa criada com sucesso', 'id': task_id})
        }
    except ClientError as e:
        raise e

def delete_task(event):
    query_params = event.get('queryStringParameters')
    
    if not query_params or 'id' not in query_params:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'O parâmetro "id" é obrigatório.'})
        }

    task_id = query_params['id']

    try:
        table.delete_item(
            Key={'id': task_id}
        )
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Tarefa excluída com sucesso'})
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': e.response['Error']['Message']})
        }
