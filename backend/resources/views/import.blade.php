<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <form class="form-horizontal" method="POST" action="" enctype="multipart/form-data">
            {{ csrf_field() }}           
            <input id="file" type="file" class="form-control" name="source" required>    
            <button type="submit" class="btn btn-primary">确定上传</button>
        </form>
    </div>
</body>
</html>