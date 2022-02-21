# Generated by Django 3.2.7 on 2022-02-21 13:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gui', '0020_auto_20220126_2113'),
    ]

    operations = [
        migrations.CreateModel(
            name='Closures',
            fields=[
                ('chan_id', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('closing_tx', models.CharField(max_length=64)),
                ('remote_pubkey', models.CharField(max_length=66)),
                ('capacity', models.BigIntegerField()),
                ('close_height', models.IntegerField()),
                ('settled_balance', models.BigIntegerField()),
                ('time_locked_balance', models.BigIntegerField()),
                ('close_type', models.IntegerField()),
                ('open_initiator', models.IntegerField()),
                ('close_initiator', models.IntegerField()),
                ('resolution_count', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='invoices',
            name='sender',
            field=models.CharField(max_length=66, null=True),
        ),
        migrations.AlterField(
            model_name='autopilot',
            name='chan_id',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='channels',
            name='chan_id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='failedhtlcs',
            name='chan_id_in',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='failedhtlcs',
            name='chan_id_out',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='forwards',
            name='chan_id_in',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='forwards',
            name='chan_id_out',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='invoices',
            name='chan_in',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='paymenthops',
            name='chan_id',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='payments',
            name='chan_out',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='payments',
            name='message',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='pendinghtlcs',
            name='chan_id',
            field=models.CharField(max_length=20),
        ),
        migrations.CreateModel(
            name='Resolutions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resolution_type', models.IntegerField()),
                ('outcome', models.IntegerField()),
                ('outpoint_tx', models.CharField(max_length=64)),
                ('outpoint_index', models.IntegerField()),
                ('amount_sat', models.BigIntegerField()),
                ('sweep_txid', models.CharField(max_length=64)),
                ('chan_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gui.closures')),
            ],
        ),
    ]
