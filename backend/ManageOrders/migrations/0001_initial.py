# Generated by Django 3.1.4 on 2020-12-22 09:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('ManageShops', '0001_initial'),
        ('Authuser', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_date', models.DateTimeField(auto_now=True)),
                ('delivery_date', models.DateTimeField()),
                ('total_amount', models.PositiveIntegerField()),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Authuser.address')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Authuser.customers')),
            ],
        ),
        migrations.CreateModel(
            name='ProductOrder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ManageOrders.orders')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ManageShops.products')),
            ],
        ),
        migrations.CreateModel(
            name='CartDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('added_date', models.DateTimeField(auto_now=True)),
                ('customer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='Authuser.customers')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ManageShops.products')),
            ],
        ),
    ]
