# Generated by Django 3.1.4 on 2020-12-22 09:43

import ManageShops.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Authuser', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20)),
                ('catagory', models.CharField(max_length=10)),
                ('amount', models.PositiveIntegerField()),
                ('discount', models.PositiveIntegerField()),
                ('details', models.CharField(max_length=100)),
                ('vendor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Authuser.vendors')),
            ],
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=ManageShops.models.user_directory_path)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ManageShops.products')),
            ],
        ),
    ]